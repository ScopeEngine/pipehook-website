-- Rename city → region for /demo/[leadSlug] {{region}} copy.

alter table leads rename column city to region;

notify pgrst, 'reload schema';
