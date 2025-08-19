ALTER TABLE products_inventory
  ADD COLUMN inventory_total_price numeric null,
  ADD COLUMN inventory_quantity numeric null,
  ADD COLUMN inventory_quantity_unit text null;
