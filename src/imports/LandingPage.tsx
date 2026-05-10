import svgPaths from "./svg-zo5hcw23ut";
import imgImage from "figma:asset/8a82e9b8f3a3283b6828b75f83e51a6fb0f36187.png";
import imgRectangle110440 from "figma:asset/fc21442dd26be4739208a543ae046c7ad8cc7ded.png";
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="absolute bg-black content-stretch flex h-[42.044px] items-center justify-center left-[1295.4px] p-[10px] rounded-[15px] top-[14px] w-[137.602px]">
      <div aria-hidden="true" className="absolute border-2 border-[#24c6dc] border-solid inset-[-2px] pointer-events-none rounded-[17px]" />
      <p className="font-['Helvetica:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white">{text}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white relative size-full" data-name="Landing Page">
      <div className="absolute bg-[#111] h-[1024px] left-1/2 overflow-clip top-0 translate-x-[-50%] w-[1440px]" data-name="Dark Web comp">
        <div className="absolute h-[1045px] left-0 top-0 w-[1440px]" data-name="image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
        </div>
        <div className="absolute bg-[rgba(0,0,0,0.33)] h-[1024px] left-[22px] top-0 w-[1440px]" />
        <div className="absolute contents left-1/2 top-[478px] translate-x-[-50%]">
          <div className="absolute contents left-[calc(41.67%+33px)] top-[478px]">
            <div className="absolute flex flex-col font-['Graphik_Trial:Bold',sans-serif] h-[38px] justify-center leading-[0] left-[calc(54.17%-24px)] not-italic text-[36px] text-white top-[522px] translate-y-[-50%] w-[47px]">
              <p className="leading-[normal]">to</p>
            </div>
            <div className="absolute flex flex-col font-['Graphik_Trial:Bold',sans-serif] h-[88px] justify-center leading-[0] left-[calc(50%-87px)] not-italic text-[36px] text-white top-[522px] translate-y-[-50%] w-[174px]">
              <p className="leading-[normal]">Dofra</p>
            </div>
            <div className="absolute left-[calc(50%+13px)] size-[25px] top-[509px]">
              <div className="absolute inset-[0_14.64%_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 25">
                  <path d={svgPaths.p3367c070} fill="var(--fill-0, #05997F)" id="Ellipse 142" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#111] h-[70px] left-1/2 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 translate-x-[-50%] w-[1440px]" data-name="Header">
        <div className="absolute contents left-[6px] top-[-4px]">
          <div className="absolute h-[64px] left-[6px] top-[-4px] w-[65.576px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle110440} />
          </div>
          <p className="absolute font-['Helvetica:Regular',sans-serif] h-[22.489px] leading-[normal] left-[119.33px] not-italic text-[20px] text-white top-[24px] w-[176.303px]">Business Listings</p>
          <div className="absolute content-stretch flex h-[42.044px] items-center justify-center left-[349.38px] p-[10px] rounded-[15px] top-[14px] w-[145.128px]">
            <p className="font-['Helvetica:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white">HUSE Circle</p>
          </div>
          <p className="absolute font-['Helvetica:Regular',sans-serif] h-[22.489px] leading-[normal] left-[548.26px] not-italic text-[20px] text-white top-[23.78px] w-[113.952px]">Contact Us</p>
          <p className="absolute font-['Helvetica:Regular',sans-serif] h-[22.489px] leading-[normal] left-[1213.7px] not-italic text-[20px] text-white top-[23.73px] w-[58.051px]">Login</p>
          <Text text="Get started" />
        </div>
        <div className="absolute contents left-[1295.4px] top-[14px]">
          <Text text="Get started" />
        </div>
      </div>
    </div>
  );
}