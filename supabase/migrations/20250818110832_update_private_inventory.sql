-- From private inventory table, add currency column
ALTER TABLE public.private_inventory_item ADD column currency TEXT NOT NULL;
