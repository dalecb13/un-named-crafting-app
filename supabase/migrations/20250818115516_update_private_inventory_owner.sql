DROP POLICY "Authenticated users can read private inventory items" ON public.private_inventory_item;
DROP POLICY "Authenticated users can update private inventory items" ON public.private_inventory_item;
DROP POLICY "Authenticated users can delete private inventory items" ON public.private_inventory_item;

-- Update private inventory owner_id column to reference users table
ALTER TABLE public.private_inventory_item
  DROP COLUMN owner_id,
  ADD COLUMN owner_id uuid REFERENCES users (id);

-- Allow all authenticated users to read from private_inventory_item table
CREATE POLICY "Authenticated users can read private inventory items"
  ON public.private_inventory_item
  FOR SELECT USING (auth.uid()
  IS NOT NULL AND private_inventory_item.owner_id = auth.uid());

-- Allow all authenticated users to update their own private_inventory_item table
CREATE POLICY "Authenticated users can update private inventory items"
  ON public.private_inventory_item
  FOR UPDATE USING (auth.uid()
  IS NOT NULL AND private_inventory_item.owner_id = auth.uid());

-- Allow all authenticated users to delete their own private_inventory_item table
CREATE POLICY "Authenticated users can delete private inventory items"
  ON public.private_inventory_item
  FOR DELETE USING (auth.uid()
  IS NOT NULL AND private_inventory_item.owner_id = auth.uid());