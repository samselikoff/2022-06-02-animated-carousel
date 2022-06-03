import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "@heroicons/react/solid";
import useMeasure from "react-use-measure";

export default function Home() {
  let [count, setCount] = useState(1);
  let previous = usePrevious(count);
  let [ref, { width }] = useMeasure();
  let direction = count > previous ? 1 : -1;

  return (
    <div className="mx-auto flex w-full  flex-col items-center py-16 px-4">
      <div className="flex w-full justify-between">
        <button
          onClick={() => setCount(count - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-gray-200"
        >
          <Icons.ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-gray-200"
        >
          <Icons.ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div
        ref={ref}
        className="relative mt-8 flex h-28 w-1/2 items-center justify-center overflow-hidden bg-gray-700"
      >
        <AnimatePresence custom={{ direction, width }}>
          <motion.div
            key={count}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={{ direction, width }}
            className={`${
              colors[Math.abs(count) % 4]
            } absolute flex h-20 w-20 items-center justify-center text-xl font-bold text-white`}
          >
            {count}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
let variants = {
  enter: ({ direction, width }) => ({
    x: direction * width,
  }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({
    x: direction * -width,
  }),
};

function usePrevious(state) {
  let [tuple, setTuple] = useState([state, null]);
  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }

  return tuple[0];
}
