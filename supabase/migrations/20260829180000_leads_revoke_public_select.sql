-- Revoke the public read policy if the first migration already ran.

drop policy if exists "Public can read leads" on leads;
