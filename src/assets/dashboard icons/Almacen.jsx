import React from "react";

function Almacen({ width = 20, color }) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.4948 4.33224C12.6423 3.57447 11.3577 3.57447 10.5052 4.33224L4.50518 9.66558C4.02483 10.0926 3.75 10.7046 3.75 11.3472V21.2501H5.25L5.25 15.948C5.24997 15.0496 5.24994 14.3004 5.32991 13.7056C5.41432 13.0778 5.59999 12.511 6.05546 12.0555C6.51093 11.6 7.07773 11.4144 7.70552 11.33C8.3003 11.25 9.04952 11.25 9.94801 11.25H14.052C14.9505 11.25 15.6997 11.25 16.2945 11.33C16.9223 11.4144 17.4891 11.6 17.9445 12.0555C18.4 12.511 18.5857 13.0778 18.6701 13.7056C18.7501 14.3004 18.75 15.0496 18.75 15.9481V21.2501H20.25V11.3472C20.25 10.7046 19.9752 10.0926 19.4948 9.66558L13.4948 4.33224ZM21.75 21.2501V11.3472C21.75 10.2761 21.2919 9.25609 20.4914 8.54446L14.4914 3.21113C13.0705 1.94818 10.9295 1.94818 9.50864 3.21113L3.50864 8.54446C2.70805 9.25609 2.25 10.2761 2.25 11.3472V21.2501H2C1.58579 21.2501 1.25 21.5858 1.25 22.0001C1.25 22.4143 1.58579 22.7501 2 22.7501H22C22.4142 22.7501 22.75 22.4143 22.75 22.0001C22.75 21.5858 22.4142 21.2501 22 21.2501H21.75ZM17.25 21.2501V16.0001C17.25 15.036 17.2484 14.3885 17.1835 13.9054C17.1214 13.444 17.0142 13.2465 16.8839 13.1162C16.7536 12.9859 16.5561 12.8786 16.0946 12.8166C15.6116 12.7516 14.964 12.7501 14 12.7501H10C9.03599 12.7501 8.38843 12.7516 7.90539 12.8166C7.44393 12.8786 7.24643 12.9859 7.11612 13.1162C6.9858 13.2465 6.87858 13.444 6.81654 13.9054C6.75159 14.3885 6.75 15.036 6.75 16.0001V21.2501H17.25ZM9.25 9.00005C9.25 8.58584 9.58579 8.25005 10 8.25005H14C14.4142 8.25005 14.75 8.58584 14.75 9.00005C14.75 9.41426 14.4142 9.75005 14 9.75005H10C9.58579 9.75005 9.25 9.41426 9.25 9.00005ZM8.25 15.5001C8.25 15.0858 8.58579 14.7501 9 14.7501H15C15.4142 14.7501 15.75 15.0858 15.75 15.5001C15.75 15.9143 15.4142 16.2501 15 16.2501H9C8.58579 16.2501 8.25 15.9143 8.25 15.5001ZM8.25 18.5001C8.25 18.0858 8.58579 17.7501 9 17.7501H15C15.4142 17.7501 15.75 18.0858 15.75 18.5001C15.75 18.9143 15.4142 19.25 15 19.25H9C8.58579 19.25 8.25 18.9143 8.25 18.5001Z"
        fill={color}
      />
    </svg>
  );
}

export default Almacen;
