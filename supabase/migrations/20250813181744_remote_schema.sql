drop policy "Authenticated users can read global inventory items" on "public"."global_inventory_item";

drop policy "Authenticated users can delete private inventory items" on "public"."private_inventory_item";

drop policy "Authenticated users can insert private inventory items" on "public"."private_inventory_item";

drop policy "Authenticated users can read private inventory items" on "public"."private_inventory_item";

drop policy "Authenticated users can update private inventory items" on "public"."private_inventory_item";

revoke delete on table "public"."global_inventory_item" from "anon";

revoke insert on table "public"."global_inventory_item" from "anon";

revoke references on table "public"."global_inventory_item" from "anon";

revoke select on table "public"."global_inventory_item" from "anon";

revoke trigger on table "public"."global_inventory_item" from "anon";

revoke truncate on table "public"."global_inventory_item" from "anon";

revoke update on table "public"."global_inventory_item" from "anon";

revoke delete on table "public"."global_inventory_item" from "authenticated";

revoke insert on table "public"."global_inventory_item" from "authenticated";

revoke references on table "public"."global_inventory_item" from "authenticated";

revoke select on table "public"."global_inventory_item" from "authenticated";

revoke trigger on table "public"."global_inventory_item" from "authenticated";

revoke truncate on table "public"."global_inventory_item" from "authenticated";

revoke update on table "public"."global_inventory_item" from "authenticated";

revoke delete on table "public"."global_inventory_item" from "service_role";

revoke insert on table "public"."global_inventory_item" from "service_role";

revoke references on table "public"."global_inventory_item" from "service_role";

revoke select on table "public"."global_inventory_item" from "service_role";

revoke trigger on table "public"."global_inventory_item" from "service_role";

revoke truncate on table "public"."global_inventory_item" from "service_role";

revoke update on table "public"."global_inventory_item" from "service_role";

revoke delete on table "public"."private_inventory_item" from "anon";

revoke insert on table "public"."private_inventory_item" from "anon";

revoke references on table "public"."private_inventory_item" from "anon";

revoke select on table "public"."private_inventory_item" from "anon";

revoke trigger on table "public"."private_inventory_item" from "anon";

revoke truncate on table "public"."private_inventory_item" from "anon";

revoke update on table "public"."private_inventory_item" from "anon";

revoke delete on table "public"."private_inventory_item" from "authenticated";

revoke insert on table "public"."private_inventory_item" from "authenticated";

revoke references on table "public"."private_inventory_item" from "authenticated";

revoke select on table "public"."private_inventory_item" from "authenticated";

revoke trigger on table "public"."private_inventory_item" from "authenticated";

revoke truncate on table "public"."private_inventory_item" from "authenticated";

revoke update on table "public"."private_inventory_item" from "authenticated";

revoke delete on table "public"."private_inventory_item" from "service_role";

revoke insert on table "public"."private_inventory_item" from "service_role";

revoke references on table "public"."private_inventory_item" from "service_role";

revoke select on table "public"."private_inventory_item" from "service_role";

revoke trigger on table "public"."private_inventory_item" from "service_role";

revoke truncate on table "public"."private_inventory_item" from "service_role";

revoke update on table "public"."private_inventory_item" from "service_role";

alter table "public"."private_inventory_item" drop constraint "private_inventory_item_global_id_key";

alter table "public"."private_inventory_item" drop constraint "private_inventory_item_owner_id_fkey";

drop function if exists "public"."handle_new_user"();

alter table "public"."global_inventory_item" drop constraint "global_inventory_item_pkey";

alter table "public"."private_inventory_item" drop constraint "private_inventory_item_pkey";

drop index if exists "public"."global_inventory_item_pkey";

drop index if exists "public"."private_inventory_item_global_id_key";

drop index if exists "public"."private_inventory_item_pkey";

drop table "public"."global_inventory_item";

drop table "public"."private_inventory_item";


