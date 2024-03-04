import { useEffect, useState } from "react";
import { useApp } from "../../provider/context-hooks";
import SelectInput from "../shared/SelectInput";
import ListTable from "../shared/ListTable";

function CreateList() {
    const { quoteList, activeUsername } = useApp();
  const [searchCategory, setSearchCategory] = useState("all");
  const [userCreations, setUserCreations] = useState(quoteList.filter(
    (quote) => quote.creatorId === activeUsername
  ));
  
  const creationsList =
    searchCategory === "all"
      ? userCreations
      : userCreations.filter((quote) =>
          quote.category.includes(searchCategory)
        );

  const updateSearchCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value);
  };

  useEffect(() => { 
    setUserCreations(quoteList.filter(
      (quote) => quote.creatorId === activeUsername
    ));
  }, [quoteList, activeUsername]);

  return (
    <div className="creation-list">
      <header className="list-head">
        Here you can view all of your contributions to the community
      </header>

      <SelectInput
        label="Filter By Category:"
        value={searchCategory}
        onChange={updateSearchCategory}
      />

      <ListTable list={creationsList} />
    </div>
  );
}

export default CreateList;
