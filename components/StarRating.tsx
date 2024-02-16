import { Rating } from "react-simple-star-rating";

interface StarRatingProps {
  rating: number;
  starRating: number;
}

export const StarRating = (props: StarRatingProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full flex items-center gap-3">
          <Rating
            size={30}
            allowFraction
            readonly={true}
            initialValue={props.starRating}
            SVGstyle={{ display: "inline" }}
            iconsCount={5}
          />
          <div>{props.rating}</div>
        </div>
      </div>
    </div>
  );
};
