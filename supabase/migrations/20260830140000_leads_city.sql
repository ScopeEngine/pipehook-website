-- Service city shown as {{stad}} on /demo/[leadSlug].
-- Default keeps existing rows valid until they are edited.

alter table leads
  add column if not exists city text not null default '';

notify pgrst, 'reload schema';
