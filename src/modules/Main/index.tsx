/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CsvDownload from "react-json-to-csv";
import { Card } from "../../app/components/Card";
import { loadGames } from "../../app/store/actions/games";
import { IGame } from "../../entities/game";
import "./index.scss";

const Main = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const gamesList = useSelector((state: any) => state.games.data);

  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");

  const handleChangeString = (handler: (v: string) => void) => (e: any) => {
    handler(e.target.value);
  };

  const handleChangeNumber = (handler: (v: number) => void) => (e: any) => {
    handler(e.target.value);
  };

  useEffect(() => {
    dispatch(loadGames({ page, perPage: perPage, search, searchField }));
  }, [page, perPage]);

  const handleSearch = () => {
    dispatch(loadGames({ page, perPage: perPage, search, searchField }));
  };

  return (
    <section className="games">
      <div className="games__wrapper">
        <div className="games__controls">
          <div className="games__controls__paginator">
            <div className="games__page">
              <div className="games__page__arrow">&#8249;</div>
              <div className="games__page__value">0</div>
              <div className="games__page__arrow">&#8250;</div>
            </div>
            <span>Elements on page: </span>
            <select
              className="games__count"
              value={perPage}
              onChange={handleChangeNumber(setPerPage)}
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
            </select>
            <CsvDownload
              data={gamesList}
              filename="games.csv"
              style={{
                boxShadow: "inset 0px 1px 0px 0px #e184f3",
                background:
                  "linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                backgroundColor: "#c123de",
                borderRadius: "6px",
                border: "1px solid #a511c0",
                display: "inline-block",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "bold",
                padding: "6px 24px",
                textDecoration: "none",
                textShadow: "0px 1px 0px #9b14b3",
              }}
            >
              Download Data ✨
            </CsvDownload>
          </div>
          <div className="games__controls__search">
            <select
              className="games__language"
              value={searchField}
              onChange={handleChangeString(setSearchField)}
            >
              <option value="name">Name</option>
              <option value="description">Description</option>
            </select>
            <input
              placeholder="Type to search"
              className="games__search"
              value={search}
              onChange={handleChangeString(setSearch)}
            />
            <div className="games__confirm-search" onClick={handleSearch}>
              Search
            </div>
          </div>
        </div>
        <div className="games__cards-area">
          {gamesList.map((item: IGame, index: number) => (
            <Card key={index} card={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
