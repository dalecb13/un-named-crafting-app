CREATE TABLE products_inventory (
  product_id uuid not null,
  inventory_id uuid not null,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  constraint products_inventory_pkey primary key (product_id, inventory_id),
  constraint products_inventory_product_id_fkey foreign key (product_id) references products (id) on update cascade on delete cascade,
  constraint products_inventory_inventory_id_fkey foreign key (inventory_id) references private_inventory_item (id) on update cascade on delete cascade
);

-- Enable RLS
ALTER TABLE products_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read products_inventory"
  ON public.products_inventory
  FOR SELECT USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Authenticated users can insert products_inventory"
  ON public.products_inventory
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Authenticated users can update products_inventory"
  ON public.products_inventory
  FOR UPDATE USING (
    auth.uid() IS NOT NULL
  );