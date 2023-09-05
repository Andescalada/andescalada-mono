import * as React from "react";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

type Props = React.ComponentProps<typeof Svg> & {
  stopColor?: string;
  startColor?: string;
};

// TODO: mover a andescalada/ui

function Ribbon({
  stopColor = "#B0B9FF",
  startColor = "#E7E9FF",
  ...props
}: Props) {
  return (
    <Svg width={200} height={200} viewBox="0 0 200 200" {...props}>
      <G clipPath="url(#clip0_103_15)">
        <Path
          d="M93.68 5.155a10 10 0 0112.64 0l7.933 6.47a10.002 10.002 0 008.93 1.904l9.856-2.664a10 10 0 0111.533 5.14l4.657 9.21a10 10 0 007.359 5.364l10.129 1.605a10 10 0 018.422 9.364l.533 10.39a10 10 0 004.527 7.865l8.666 5.649a10 10 0 013.878 11.951l-3.728 9.743a10 10 0 00.943 9.007l5.66 8.746a10 10 0 01-1.312 12.49l-7.33 7.359a9.998 9.998 0 00-2.792 8.621l1.631 10.299a10.003 10.003 0 01-6.284 10.896l-9.61 3.7a10.001 10.001 0 00-6.072 6.765l-2.661 10.018a10 10 0 01-10.199 7.419l-10.209-.546a10 10 0 00-8.328 3.719l-6.438 8.008a10 10 0 01-12.361 2.63l-9.086-4.665a10.004 10.004 0 00-9.134 0l-9.087 4.665a9.999 9.999 0 01-12.36-2.63l-6.438-8.008a10 10 0 00-8.328-3.719l-10.209.546a10 10 0 01-10.2-7.419l-2.66-10.018a10 10 0 00-6.072-6.765l-9.61-3.7a10 10 0 01-6.284-10.896l1.631-10.299a10 10 0 00-2.792-8.621l-7.33-7.359a10 10 0 01-1.312-12.49l5.66-8.746a10 10 0 00.943-9.007l-3.728-9.743a10 10 0 013.878-11.951l8.666-5.649a10 10 0 004.527-7.865l.533-10.39a10 10 0 018.422-9.364l10.129-1.605a10 10 0 007.359-5.364l4.657-9.21a10 10 0 0111.533-5.14l9.856 2.664a10 10 0 008.93-1.904l7.933-6.47z"
          fill="url(#paint0_linear_103_15)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_103_15"
          x1={177}
          y1={-0.00000923648}
          x2={39.5}
          y2={152.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={stopColor} />
          <Stop offset={1} stopColor={startColor} />
        </LinearGradient>
        <ClipPath id="clip0_103_15">
          <Path fill="#fff" d="M0 0H200V200H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Ribbon;
