import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { fetchItems, removeItem, editItem } from "../features/itemsSlice";

const List = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [dispatch, status]);

  const onHandleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const onHandleEdit = (item) => {
    dispatch(editItem(item));
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((item) => (
              <Item
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                onDelete={() => onHandleDelete(item._id)}
                onEdit={onHandleEdit}
              />
            ))
          ) : (
            <p>No Notes Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
