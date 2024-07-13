import { VoidComponent } from "solid-js";

const Info: VoidComponent<{ tooltip: string }> = (props) => {
  return (
    <p data-before={props.tooltip} class="relative before:absolute before:bottom-[430%] before:left-1/2 before:text-center before:w-40 before:-m-20 before:bg-[#242424] before:z-10 before:border before:rounded-lg before:py-1 before:content-[attr(data-before)] hover:before:visible before:invisible">
      ⓘ
    </p>
  );
};

export default Info;
