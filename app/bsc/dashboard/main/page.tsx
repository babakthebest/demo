import MyLineChart from "./MyLineChart";
import ResizableContainerForCharts from "../ResizableContainerForCharts";
import MyBarChart from "./MyBarChart";
import MyPiChart from "./MyPiChart";
import Wrapper from "./Wrapper";
import MyGuageChart from "./MyGuageChart";
import MyGuageChart2 from "./MyGuageCgart2";

export default function page() {
  return (
    <div className="relative h-full w-full overflow-auto scroll-auto">
      <Wrapper height={1200} width={1200}>
        {" "}
        <ResizableContainerForCharts initialX={5} initialY={5}>
          <MyLineChart />
        </ResizableContainerForCharts>
        <ResizableContainerForCharts initialX={510} initialY={5}>
          <MyBarChart />
        </ResizableContainerForCharts>
        <ResizableContainerForCharts initialX={5} initialY={510} initialHeight={250} initialWidth={250}>
          <MyPiChart />
        </ResizableContainerForCharts>
        <ResizableContainerForCharts initialX={275} initialY={510} initialHeight={250} initialWidth={300}>
          <MyGuageChart />
        </ResizableContainerForCharts>
        <ResizableContainerForCharts initialX={615} initialY={510} initialHeight={250} initialWidth={300}>
          <MyGuageChart2 />
        </ResizableContainerForCharts>
      </Wrapper>
    </div>
  );
}
