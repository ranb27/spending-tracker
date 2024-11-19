import { useState, useEffect, useRef } from "react";
import { getClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import { formatMonthYear } from "@/utils/format-date-time";
import { useUser } from "@/app/context/user";
import { useTriggerUpdate } from "@/app/context/trigger-update";
import CardEdit from "./ui/card-edit";

interface Transaction {
  id: number;
  created_at: string;
  description: string;
  amount: number;
  is_income: boolean;
  user: string;
  category: string;
  month_year: string;
}

export default function modalEdit() {
  const { user } = useUser();
  const { trigger, setTrigger } = useTriggerUpdate();

  //! State
  const [selectMonth, setSelectMonth] = useState<string>(
    formatMonthYear(new Date())
  );

  const [data, setData] = useState<Transaction[]>([]);

  const [amount, setAmount] = useState<number | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const fetchData = async () => {
    const client = getClient();

    const { data, error } = await client
      .from("spending_tracker_db")
      .select("*")
      .eq("user", user?.email)
      .eq("month_year", selectMonth)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [trigger, selectMonth]);

  const handleDelete = async (id: number | null) => {
    if (!id) {
      alert("Please select a transaction");
      return;
    }

    //confirm
    const isConfirmed = window.confirm(
      `Are you sure? ID: ${id}\nYou won't be able to revert this!`
    );

    if (!isConfirmed) {
      return;
    }

    const client = getClient();
    try {
      await client.from("spending_tracker_db").delete().eq("id", id);
      const toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      toast.fire({
        icon: "success",
        title: "Transaction deleted successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });
      setTrigger(!trigger);
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  const handleUpdateAmount = async () => {
    if (!currentId || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const client = getClient();
    try {
      await client
        .from("spending_tracker_db")
        .update({ amount: amount })
        .eq("id", currentId);

      const toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      toast.fire({
        icon: "success",
        title: "Transaction updated successfully",
        background: "oklch(var(--b1))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--p))",
      });

      // Reset form
      setAmount(null);
      setCurrentId(null);

      // Close modal
      // const modal = document.getElementById("modal_edit") as HTMLDialogElement;
      // modal.close();

      // Refresh data
      fetchData();
      setTrigger(!trigger);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // console.log(data);

  const handleClear = () => {
    setAmount(null);
    setCurrentId(null);
  };

  // Add state to track the middle card index
  const [middleIndex, setMiddleIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to calculate scale based on card position
  const getCardStyle = (index: number) => {
    // Calculate distance from middle (0 means it's the middle card)
    const distanceFromMiddle = Math.abs(index - middleIndex);

    // Scale formula: middle card is 1.25, cards get smaller as they get further from middle
    const scale = Math.max(0.75, 1.05 - distanceFromMiddle * 0.15);
    const opacity = Math.max(0.6, 1 - distanceFromMiddle * 0.2);

    return {
      transform: `scale(${scale})`,
      opacity,
      transition: "all 0.3s ease-in-out",
    };
  };

  // Function to update middle card index based on scroll position
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 0;
    const scrollLeft = container.scrollLeft;
    const newMiddleIndex = Math.round(scrollLeft / cardWidth);

    setMiddleIndex(newMiddleIndex);
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <dialog id="modal_edit" className="modal modal-bottom md:modal-middle">
      <div className="modal-box bg-base-200">
        <h3 className="font-bold text-lg">
          <span className="text-primary">Edit Transaction</span>
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="" className="label">
            <span className="label-text-alt">Select Month</span>
          </label>
          <input
            value={selectMonth}
            type="month"
            className="input input-bordered w-full input-sm md:input-disabled border-none"
            onChange={(e) => setSelectMonth(e.target.value)}
          />

          <label htmlFor="" className="label">
            <span className="label-text-alt">Select Card</span>
          </label>

          <div
            ref={scrollContainerRef}
            className="flex w-full overflow-x-auto p-6 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
              WebkitOverflowScrolling: "touch",
            }}
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className="snap-center flex-shrink-0"
                style={getCardStyle(index)}
              >
                <CardEdit
                  id={item.id}
                  is_income={item.is_income}
                  title={item.description}
                  value={item.amount}
                  setCurrentId={setCurrentId}
                  currentId={currentId}
                  category={item.category}
                />
              </div>
            ))}

            <p className="mx-auto">
              {data.length === 0 && "No transactions found"}
            </p>
          </div>

          <label htmlFor="" className="label">
            <span className="label-text-alt">Amount</span>
          </label>

          <input
            value={amount || ""}
            placeholder="Enter amount"
            type="number"
            className="input input-bordered w-full input-sm md:input-disabled border-none"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
        <div className="modal-action">
          <button
            onClick={() => handleDelete(currentId)}
            className="btn btn-error btn-xs mr-auto"
          >
            Delete
          </button>
          <button
            onClick={handleUpdateAmount}
            className="btn btn-xs btn-neutral text-success"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="btn btn-xs btn-ghost text-primary"
          >
            Clear
          </button>
          <form method="dialog">
            <button
              onClick={handleClear}
              className="btn btn-xs btn-ghost text-error"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
