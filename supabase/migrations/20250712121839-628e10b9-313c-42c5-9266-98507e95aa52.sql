-- Add RLS policy to allow admin to delete messages
CREATE POLICY "Anyone can delete messages" 
ON public.messages 
FOR DELETE 
USING (true);