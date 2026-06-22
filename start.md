# install (once)
npm --prefix backend install
npm --prefix frontend install

# seed Atlas (once)
npm --prefix backend run seed

# run (two terminals) -> frontend talks to backend via frontend/.env
npm --prefix backend start
npm --prefix frontend run dev

# mock instead of backend (delete frontend/.env first)
npm --prefix mock-server install
npm --prefix mock-server start
