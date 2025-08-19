CREATE TABLE products (
  id uuid not null default extensions.uuid_generate_v4 (),
  product_name text not null,
  product_description text null,
  tags json null,
  number_of_units numeric null,
  owner_id uuid not null,

  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),

  constraint products_pkey primary key (id),
  constraint products_owner_id_fkey foreign key (owner_id) references users (id) on update cascade on delete set null
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read products"
  ON public.products
  FOR SELECT USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Authenticated users can insert products"
  ON public.products
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Authenticated users can update only their own products"
  ON public.products
  FOR UPDATE USING (
    auth.uid() IS NOT NULL AND products.owner_id = auth.uid()
  );
