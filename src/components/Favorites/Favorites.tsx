import { useEffect, useState } from "react";
import { useApp } from "../../provider/context-hooks";
import SelectInput from "../shared/SelectInput";
import ListTable from "../shared/ListTable";
import { Quote } from "../../types";
import "./Favorites.scss";

function Favorites() {
  const { quoteList, userFavorites } = useApp();
  const [favoritesCategory, setFavoritesCategory] = useState("all");
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const displayList =
    favoritesCategory === "all"
      ? favoriteQuotes
      : favoriteQuotes.filter((quote) => quote.category === favoritesCategory);

  const getFavoriteQuotes = () => {
    const list = [] as Quote[];

    userFavorites.forEach((favorite) => {
      const quote = quoteList.find(
        (quote) => quote.quoteKey === favorite.quoteId
      );
      if (quote) list.push(quote);
    });

    setFavoriteQuotes(list);
  };

  useEffect(() => {
    getFavoriteQuotes();
  }, [userFavorites, quoteList]);

  return (
    <section className="page favorites">
      <header className="favorites-header">
        View all of your favorite quotes and edit their favorite status or you
        can filter out your favorite quotes by quote category.
      </header>

      <div className="category-select">
        <SelectInput
          label="Search by category:"
          value={favoritesCategory}
          onChange={(e) => setFavoritesCategory(e.target.value)}
        />
      </div>

      <ListTable list={displayList} />
    </section>
  );
}

export default Favorites;
