-- Demo page locale: sv (Sweden) or us (USA). Default sv preserves existing leads.

alter table leads
  add column locale text not null default 'sv'
  check (locale in ('sv', 'us'));

notify pgrst, 'reload schema';
