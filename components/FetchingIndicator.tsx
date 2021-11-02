import React from "react";

type Props = {
  isFetching: boolean;
};
export const FetchingIndicator = ({ isFetching }: Props) => {
  return (
    <>
      {isFetching ? (
        <div className="absolute right-2">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
    </>
  );
};
