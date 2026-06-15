import Part from "./Part";
import Sum from "./Sum";

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Sum parts={course.parts} />
    </div>
  );
};

export default Content;
