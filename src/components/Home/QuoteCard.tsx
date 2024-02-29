import { useApp } from "../../provider/context-hooks";
import { Quote } from "../../types";
import { TfiReload } from "react-icons/tfi";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";

type QuoteCardProps = {
  quote: Quote;
  idx: number;
  changeOneHomeQuote: (idx: number) => void;
};

const QuoteCard = (props: QuoteCardProps) => {
  const { quote, idx, changeOneHomeQuote } = props;
  const {
    activeUsername,
    userFavorites,
    trashQuote,
    addFavorite,
    removeFavorite,
  } = useApp();
  
  const { quoteKey, text, category, author } = quote;

  const favoriteCodes = userFavorites.map((favorite) => favorite.quoteId);
  const isFavorite = favoriteCodes.includes(quoteKey);
  const favoriteId =
    userFavorites.find((favorite) => favorite.quoteId === quoteKey)?.id || 0;
  const isCreator = activeUsername  === quote.creatorId;

  const handleQuoteDelete = (id: number) => {
    trashQuote(id);
    changeOneHomeQuote(idx);
  };

  return (
    <div className="quote-card" key={quoteKey}>
      <div className="card-bar flex-between-center">
        <h3 className="card-category">{category}</h3>

        <div className="action-btns">
          <button
            className="card-btn reload"
            onClick={(e) => (e.preventDefault(), changeOneHomeQuote(idx))}
          >
            <TfiReload />
          </button>
          {activeUsername && (
            <button
              className="card-btn favorite"
              onClick={(e) => {
                e.preventDefault();
                isFavorite
                  ? removeFavorite(favoriteId)
                  : addFavorite(quoteKey);
              }}
            >
              {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          )}
          {isCreator && (
            <button
              className="card-btn delete"
              onClick={(e) => (
                e.preventDefault(), handleQuoteDelete(quote.id as number)
              )}
            >
              <AiFillDelete />
            </button>
          )}
        </div>
      </div>
      <div className="card-body">
        <p className="card-content quote">{text}</p>
        <p className="card-content author">- {author}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
