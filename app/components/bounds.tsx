import { usePageState } from "../../providers/page-provider";

const Bounds = () => {
  const { bounds } = usePageState();

  return (
    <div className="text-xs text-slate-500 mb-1">
      <div>
        {bounds[0][0]}, {bounds[0][1]}
      </div>
      <div>
        {bounds[1][0]}, {bounds[1][1]}
      </div>
    </div>
  );
};

export default Bounds;
