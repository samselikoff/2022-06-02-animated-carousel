import { useState } from "react";
import * as Icons from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

export default function Home() {
  let [ref, { width }] = useMeasure();
  let [count, setCount] = useState(1);
  let prev = usePrevious(count);
  let direction = count > prev ? 1 : -1;

  return (
    <div className="flex justify-center">
      <div className="mt-12 w-full max-w-lg text-white">
        <div className="flex justify-between px-4">
          <button onClick={() => setCount(count - 1)}>
            <Icons.ChevronLeftIcon className="h-10 w-10" />
          </button>
          <button onClick={() => setCount(count + 1)}>
            <Icons.ChevronRightIcon className="h-10 w-10" />
          </button>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="aspect-square w-2/5">
            <div
              ref={ref}
              className="relative flex h-full items-center justify-center overflow-hidden bg-gray-700"
            >
              <AnimatePresence custom={{ direction, width }}>
                <motion.div
                  key={count}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={{ direction, width }}
                  className={`absolute flex h-2/3 w-2/3 items-center justify-center text-3xl font-bold ${
                    colors[Math.abs(count) % 4]
                  }`}
                >
                  {count}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
};

let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

function usePrevious(state) {
  let [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }

  return tuple[0];
}
