import { useApp } from "../../provider/context-hooks";
import { Quote } from "../../types";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";

type ListTableProps = {
  list: Quote[] | [];
};

const ListTable = ({ list }: ListTableProps) => {
  const {
    activeUsername,
    quoteList,
    userFavorites,
    removeFavorite,
    trashQuote,
  } = useApp();

  const handleDelete = (quoteId: string, favoriteId: number) => {
    const quoteToDelete = quoteList.find((quote) => quote.quoteKey === quoteId);
    if (quoteToDelete) {
      trashQuote(quoteToDelete.id as number);
    }
    removeFavorite(Number(favoriteId));
  };

  return (
    <table className="list-table">
      <thead>
        <tr>
          <th className="quote cell head">Quote</th>
          <th className="author cell head">Author</th>
          <th className="category cell head">Category</th>
          <th className="actions cell head"></th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 && (
          <tr>
            <td className="no-quote cell" colSpan={4}>
              No quotes to display.
            </td>
          </tr>
        )}

        {list.map((quote) => {
          const favoriteId = userFavorites.find(
            (favorite) => favorite.quoteId === quote.quoteKey
          )?.id;
          const isCreator = activeUsername === quote.creatorId;
          return (
            <tr key={quote.id}>
              <td className="quote cell">{quote.text}</td>
              <td className="author cell">{quote.author}</td>
              <td className="category cell">{quote.category}</td>
              <td className="actions cell">
                {isCreator ? (
                  <AiFillDelete
                    className="table-btn delete"
                    onClick={() =>
                      handleDelete(quote.quoteKey, favoriteId as number)
                    }
                  />
                ) : (
                  <AiFillHeart
                    className="table-btn unfavorite"
                    onClick={() => removeFavorite(favoriteId as number)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListTable;
