import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { themeColors } from "~/theme";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import BalanceComponent from "./BalanceComponent";
import Svg, {
  G,
  Circle,
  Mask,
  Ellipse,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg";

export default function HeaderComponent({ user, setUser }) {
  function SvgComponent() {
    return (
      <Svg width={80} height={80} viewBox="0 0 1024 1024" fill="none">
        <G clipPath="url(#clip0_1_228)">
          <Circle cx={518} cy={518} r={364} fill="#77A5FF" />
          <Mask
            id="a"
            style={{
              maskType: "alpha",
            }}
            maskUnits="userSpaceOnUse"
            x={179}
            y={-111}
            width={860}
            height={851}
          >
            <Ellipse cx={609} cy={314.5} rx={430} ry={425.5} fill="#D9D9D9" />
          </Mask>
          <G mask="url(#a)">
            <Circle cx={518} cy={518} r={364} fill="#90B6FF" />
          </G>
          <Path
            d="M713.979 425.065l.115.287.308.026a47.017 47.017 0 0143.098 46.863v63.36a47.02 47.02 0 01-47.016 47.019h-5.025l-.118.332-32.094 89.852.471.169-.471-.169a31.174 31.174 0 01-29.365 20.696h-25.183a31.173 31.173 0 01-29.366-20.696l-3.801-10.652-.118-.332H471.264l-.119.332-3.801 10.652a31.174 31.174 0 01-29.365 20.696h-25.184a31.174 31.174 0 01-29.385-20.696l-.471.169.471-.169-24.867-69.616-.032-.091-.064-.072a173.13 173.13 0 01-42.305-95.516l-.081-.728-.649.34a32.178 32.178 0 00-17.235 28.479v.001a15.342 15.342 0 01-15.338 15.34 15.34 15.34 0 01-15.339-15.339 62.861 62.861 0 0147.691-60.737l.349-.087.029-.358a173.977 173.977 0 0155.377-113.762A173.957 173.957 0 01488.742 314.5h205.903a15.336 15.336 0 0115.339 15.34 15.34 15.34 0 01-15.339 15.34h-43.991l1.296.909a173.599 173.599 0 0159.559 73.048c.851 1.978 1.68 3.953 2.47 5.928zm-398.274 83.033a173.63 173.63 0 0042.368 95.258l-59.396-67.755a31.689 31.689 0 0116.493-27.783l-.022-.199.497-.055.232.443-.172.091zm173.037-114.557h79.193a16.336 16.336 0 0016.339-16.34 16.343 16.343 0 00-16.339-16.34h-79.193a16.34 16.34 0 000 32.68zm121.152 106.791a24.254 24.254 0 0030.63-3.017 24.26 24.26 0 00-21.886-40.948 24.259 24.259 0 00-17.679 33.078 24.256 24.256 0 008.935 10.887z"
            fill="#1A1B1E"
            stroke="#000"
          />
          <Path
            d="M349.522 725.917c-5.138 0-9.705-1.572-13.7-4.715-3.996-3.144-6.755-7.185-8.278-12.125l-29.112-105.604c-.951-3.615-.331-6.945 1.861-9.99 2.192-3.044 5.187-4.566 8.985-4.566h54.229l50.233-74.779c.952-1.523 2.284-2.76 3.996-3.711 1.713-.951 3.52-1.427 5.423-1.427s3.71.476 5.423 1.427c1.712.951 3.044 2.188 3.996 3.711l50.233 74.779h54.8c3.806 0 6.804 1.522 8.996 4.566 2.192 3.045 2.809 6.375 1.85 9.99l-29.113 105.604c-1.522 4.947-4.281 8.993-8.277 12.136-3.995 3.143-8.562 4.711-13.7 4.704H349.522zm-.286-22.834h148.417l25.116-91.333h-198.65l25.117 91.333zm74.208-22.833c6.28 0 11.657-2.234 16.132-6.702 4.476-4.467 6.709-9.845 6.702-16.131 0-6.28-2.234-11.653-6.702-16.121-4.468-4.467-9.845-6.705-16.132-6.713-6.279 0-11.652 2.238-16.12 6.713-4.468 4.476-6.705 9.849-6.713 16.121 0 6.279 2.238 11.656 6.713 16.131 4.475 4.476 9.849 6.71 16.12 6.702zm-32.252-91.333h64.219l-32.252-47.95-31.967 47.95z"
            fill="#e3e2e6"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_1_228">
            <Path fill="#fff" d="M0 0H1024V1024H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    );
  }

  return (
    <Animated.View
      className="flex-row justify-between items-center"
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(300)}
    >
      <View className="flex-row items-center space-x-3">
        <TouchableOpacity className="-m-4">
          <SvgComponent />
        </TouchableOpacity>
        <Text
          className="font-semibold text-xl pl-1"
          style={{ color: themeColors.onBackground }}
        >
          {"Hi " + user.username}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          className="rounded-2xl py-2 px-3"
          style={{
            backgroundColor:
              user.balance > 0
                ? themeColors.success
                : themeColors.errorContainer,
          }}
        >
          <BalanceComponent user={user} setUser={setUser} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
