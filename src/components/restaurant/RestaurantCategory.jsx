import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import ItemListWithToast from "../ItemListWithToast";

function RestaurantCategory({ menu, num, curOpen, onOpen }) {
  const isOpen = num === curOpen;

  function handleClick() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className="mx-auto my-4 w-full rounded-lg md:w-8/12">
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-base font-semibold md:text-lg">
          {menu.title}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({menu?.itemCards.length})
          </span>
        </span>

        {isOpen ? (
          <HiChevronUp className="text-xl text-gray-600" />
        ) : (
          <HiChevronDown className="text-xl text-gray-600" />
        )}
      </button>

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
