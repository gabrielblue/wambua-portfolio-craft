-- Add RLS policy to allow admin to delete conversations
CREATE POLICY "Anyone can delete conversations" 
ON public.conversations 
FOR DELETE 
USING (true);