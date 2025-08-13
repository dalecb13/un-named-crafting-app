-- Add global_inventory_item table
create table public.global_inventory_item (
  id uuid not null default extensions.uuid_generate_v4 (),
  item_name text not null,
  parent_company text null,
  links json null,
  image_link text null,
  tags json null,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  constraint global_inventory_item_pkey primary key (id)
) TABLESPACE pg_default;

-- Add private_inventory_item table
create table public.private_inventory_item (
  id uuid not null default extensions.uuid_generate_v4 (),
  global_id uuid null,
  item_name text not null,
  parent_company text null,
  links json null,
  owner_id uuid null,
  price numeric null,
  price_per_unit numeric null,
  image_link text null,
  tags json null,
  quantity numeric null,
  quantity_unit text null,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  constraint private_inventory_item_pkey primary key (id),
  constraint private_inventory_item_global_id_key unique (global_id),
  constraint private_inventory_item_owner_id_fkey foreign key (owner_id) references auth.users (id) on update cascade on delete set null
) TABLESPACE pg_default;

-- Enable RLS for all tables
ALTER TABLE public.global_inventory_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_inventory_item ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read from global_inventory_item table
CREATE POLICY "Authenticated users can read global inventory items"
  ON public.global_inventory_item
  FOR SELECT USING (auth.uid()
  IS NOT NULL);

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

-- Allow all authenticated users to insert into private_inventory_item table
CREATE POLICY "Authenticated users can insert private inventory items"
  ON public.private_inventory_item
  FOR INSERT WITH CHECK (auth.uid()
  IS NOT NULL);
