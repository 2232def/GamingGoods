// src/components/ImageGrid.js
import React from "react";

function ImageGrid() {
  return (
    <div className=" container mx-auto p-3">
      <div className="flex items-center  justify-center ml-[4rem]">
        <div className="flex w-full max-w-8xl">
          <div className="flex flex-col w-[20vw] ">
            <div className="h-full bg-blue-300">
              <img className="object-fill" src="https://rukminim2.flixcart.com/image/612/612/xif0q/gamepad/j/f/a/elite-x-wireless-evofox-original-imagu6fff6a39cpf.jpeg?q=50" alt="" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-2/5 mx-4">
            <div className="aspect-square bg-red-300">
              <img src="https://www.quietpc.com/images/products/asus-cerberus-mouse-white-large.jpg" alt="" />
            </div>
            <div className="aspect-square bg-yellow-300 ">
              <img className="" src="https://rukminim2.flixcart.com/image/612/612/xif0q/keyboard/desktop-keyboard/w/2/e/ronin-tkl-rgb-mechanical-evofox-original-imah5vr9by3zgsjq.jpeg?q=70" alt="" />
            </div>
            <div className="aspect-square bg-purple-300">
              <img src="https://rukminim2.flixcart.com/image/612/612/xif0q/mousepad/t/s/b/long-designer-gaming-mousepad-70x30-cm-water-proof-xxl-desk-mat-original-imagjwrfxqzggnew.jpeg?q=70" alt="" />
            </div>
            <div className="aspect-square  bg-pink-300">
              <img className="object-scale-down max-h-full" src="https://rukminim2.flixcart.com/image/612/612/xif0q/mouse/u/d/w/mouse-laptop-mouse-computer-mouse-wired-usb-mouse-6-buttons-original-imahfa8a4ugsdejs.jpeg?q=70" alt="" />
            </div>
          </div>

          <div className="flex flex-col w-[20vw]">
            <div className="h-full bg-orange-300">
              <img src="https://rukminim2.flixcart.com/image/612/612/xif0q/joystick/analog-joysticks/0/n/3/x3-wireless-bluetooth-gamepad-for-android-windows-smart-tv-pubg-original-imah6j6rdzg2vujx.jpeg?q=70" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGrid;
