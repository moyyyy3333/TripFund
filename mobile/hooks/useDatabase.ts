import { useEffect, useState } from 'react';
import { supabase, Pool, PoolMember, Contribution, Message, Profile } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// Hook to fetch user's pools
export function useUserPools() {
  const { user } = useAuth();
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPools = async () => {
    if (!user) {
      setPools([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get pools where user is a member
      const { data: memberData, error: memberError } = await supabase
        .from('pool_members')
        .select('pool_id')
        .eq('user_id', user.id);

      if (memberError) throw memberError;

      const poolIds = memberData.map((m) => m.pool_id);

      if (poolIds.length === 0) {
        setPools([]);
        setLoading(false);
        return;
      }

      // Get pool details
      const { data: poolsData, error: poolsError } = await supabase
        .from('pools')
        .select('*')
        .in('id', poolIds)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (poolsError) throw poolsError;

      setPools(poolsData || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching pools:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();

    // Subscribe to pool changes
    const subscription = supabase
      .channel('pools-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pools',
        },
        () => {
          fetchPools();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { pools, loading, error, refetch: fetchPools };
}

// Hook to fetch pool members
export function usePoolMembers(poolId: string) {
  const [members, setMembers] = useState<(PoolMember & { profile: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!poolId) return;

    const fetchMembers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('pool_members')
          .select(`
            *,
            profile:profiles(*)
          `)
          .eq('pool_id', poolId);

        if (error) throw error;
        setMembers(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();

    // Subscribe to member changes
    const subscription = supabase
      .channel(`pool-members-${poolId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pool_members',
          filter: `pool_id=eq.${poolId}`,
        },
        () => {
          fetchMembers();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [poolId]);

  return { members, loading, error };
}

// Hook to fetch pool contributions
export function usePoolContributions(poolId: string) {
  const [contributions, setContributions] = useState<(Contribution & { profile: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!poolId) return;

    const fetchContributions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('contributions')
          .select(`
            *,
            profile:profiles(*)
          `)
          .eq('pool_id', poolId)
          .eq('status', 'completed')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContributions(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();

    // Subscribe to contribution changes
    const subscription = supabase
      .channel(`pool-contributions-${poolId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contributions',
          filter: `pool_id=eq.${poolId}`,
        },
        () => {
          fetchContributions();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [poolId]);

  return { contributions, loading, error };
}

// Hook to fetch pool messages (chat)
export function usePoolMessages(poolId: string) {
  const [messages, setMessages] = useState<(Message & { profile: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!poolId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            profile:profiles(*)
          `)
          .eq('pool_id', poolId)
          .order('created_at', { ascending: true })
          .limit(100); // Last 100 messages

        if (error) throw error;
        setMessages(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`pool-messages-${poolId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `pool_id=eq.${poolId}`,
        },
        async (payload) => {
          // Fetch the profile for the new message
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', payload.new.user_id)
            .single();

          setMessages((prev) => [
            ...prev,
            { ...payload.new, profile } as Message & { profile: Profile },
          ]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [poolId]);

  const sendMessage = async (content: string, imageUrl?: string) => {
    const { user } = useAuth();
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { error } = await supabase.from('messages').insert({
        pool_id: poolId,
        user_id: user.id,
        content,
        image_url: imageUrl,
      });

      if (error) throw error;
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  return { messages, loading, error, sendMessage };
}

// Utility function to create a pool
export async function createPool(
  userId: string,
  poolData: {
    title: string;
    description?: string;
    goalAmount: number;
    targetDate?: string;
    coverImageUrl?: string;
    poolType: Pool['pool_type'];
  }
) {
  try {
    // Create pool
    const { data: pool, error: poolError } = await supabase
      .from('pools')
      .insert({
        title: poolData.title,
        description: poolData.description,
        goal_amount: poolData.goalAmount,
        target_date: poolData.targetDate,
        cover_image_url: poolData.coverImageUrl,
        pool_type: poolData.poolType,
        created_by: userId,
      })
      .select()
      .single();

    if (poolError) throw poolError;

    // Add creator as owner
    const { error: memberError } = await supabase.from('pool_members').insert({
      pool_id: pool.id,
      user_id: userId,
      role: 'owner',
    });

    if (memberError) throw memberError;

    return { pool, error: null };
  } catch (error) {
    return { pool: null, error: error as Error };
  }
}
