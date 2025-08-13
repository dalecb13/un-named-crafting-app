# Inventory Tracker

This is a core feature of [[Crafter Tracker Overview|Crafter Tracker]]. It helps people track both the Raw Materials as well as End Products in their studio.

## Workflow Overview

When a user signs up, they are encouraged to track their inventory and the prices of relative raw materials.

1. Go to Inventory Page
2. See empty Inventory Page
3. Click on button to Add Inventory
4. See Add Inventory Form
5. Fill out fields of Add Inventory Form
6. Click Submit Button
7. See Success Message and Empty Inventory Table
8. Repeat Steps 2-7 for multiple items

## Existing Inventory

When in the "Add Inventory" Form, users should be able to see a list of existing inventory available globally. These items will have to be managed by admins, but they can contain links to Amazon and other sites that sell the item.

## Database

- The `inventory_item` database table contains both globally public records as well as user-specific records.
- Globally public records will have `null` for `user_id`.
- Globally public records will not have a price associated with them.
- Privately owned inventory items can be listed multiple times with multiple prices, because crafters can buy their raw materials on sale.

### Estimated Schemas

Global Inventory

- id: uuid
- item_name: varchar/text (unique) (index)
- parent_company: varchar/text (index)
- links: json
- image_link: varchar/text
- tags: json (index)

Private Inventory

- id: uuid
- item_name: varchar/text (unique)
- parent_company: varchar/text (index)
- links: json
- owner_id: foreign key to users table (index)
- price: decimal
- image_link: varchar/text
- tags: json (index)
