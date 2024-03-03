import { useState } from "react";
import { useApp } from "../../provider/context-hooks";
import ErrorsContainer from "../shared/ErrorsContainer";
import TextInput from "../shared/TextInput";
import SelectInput from "../shared/SelectInput";
import { Quote } from "../../types";

type CreateFormValues = {
  quoteText: string;
  author: string;
  category: string;
};

const initialCreateFormValues = {
  quoteText: "",
  author: "",
  category: "all",
};

function CreateForm() {
  const { quoteList, activeUsername, createQuote } = useApp();

  const [createFormValues, setCreateFormValues] = useState<CreateFormValues>(
    initialCreateFormValues
  );
  const [errors, setErrors] = useState<CreateFormValues>(
    {} as CreateFormValues
  );

  const { quoteText, author, category } = createFormValues;

  const updateForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setCreateFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
  };

  const updateGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateFormValues((prevFormValues) => ({
      ...prevFormValues,
      category: e.target.value,
    }));
  };

  function validateForm() {
    const newError = {} as CreateFormValues;

    if (quoteText.trim().length < 10) {
      newError.quoteText = "Quote text must be at least 10 characters.";
    }

    if (author.trim().length < 2) {
      newError.author = "Author name must be at least 2 characters.";
    }

    return newError;
  }

  function generateQuoteKey() {
    const currentCategoryQuotes = quoteList.filter(
      (quote) => quote.category === category
    );
    const lastCurrentCategoryQuoteKey =
      currentCategoryQuotes[currentCategoryQuotes.length - 1].quoteKey;
    const newQuoteKeyNum =
      parseInt(lastCurrentCategoryQuoteKey.split("-").pop() as string) + 1;
    return `${category}-${newQuoteKeyNum}`;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = validateForm();

    setErrors(newError);

    if (Object.keys(newError).length === 0) {
      const newQuote: Quote = {
        quoteKey: generateQuoteKey(),
        text: quoteText,
        author,
        category,
        creatorId: activeUsername,
      };
      createQuote(newQuote);
      setCreateFormValues(initialCreateFormValues);
    }
  };

  return (
    <form className="form create" onSubmit={handleSubmit}>
      <header>
        <h2 className="title">Create your own quotes</h2>
        <p className="subtitle">
          Add your own quotes to the community and help enrich the lives of
          others.
        </p>
      </header>

      {Object.keys(errors).length > 0 && (
        <ErrorsContainer errors={Object.entries(errors)} />
      )}

      <div className="inputs-group">
        <TextInput
          label="Quote:"
          type="textarea"
          id="quoteText"
          value={quoteText}
          areaChange={updateForm}
        />

        <TextInput
          label="Author:"
          type="text"
          id="author"
          value={author}
          textChange={updateForm}
        />

        <SelectInput
          label="Category:"
          value={category}
          onChange={updateGenre}
        />
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={!quoteText || !author || category === "all"}
      >
        Submit
      </button>
    </form>
  );
}

export default CreateForm;
