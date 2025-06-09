import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import ItemListWithToast from "../ItemListWithToast";

function RestaurantCategory({ menu, num, curOpen, onOpen }) {
  const isOpen = num === curOpen;

  function handleClick() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className="mx-auto my-4 w-full rounded-lg md:w-8/12">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition duration-300"
        onClick={handleClick}
      >
        <span className="pb-2 text-lg font-bold">
          {menu.title} ({menu?.itemCards.length})
        </span>
        <span className="text-gray-600">
          {isOpen ? (
            <HiChevronUp className="text-lg" />
          ) : (
            <HiChevronDown className="text-lg" />
          )}
        </span>
      </div>

      {isOpen && (
        <div className="mt-2 overflow-hidden transition-all duration-300 ease-in-out">
          <ItemListWithToast items={menu.itemCards} />
        </div>
      )}
      <p className="bg-gray-100 py-2"></p>
    </div>
  );
}

export default RestaurantCategory;
