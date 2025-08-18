import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="containers h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br bg-[var(--clr-bg)] text-gray-800 animate-fade-in">
      <h1 className="text-[120px] md:text-[100px] sm:text-[80px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-xl">
        404
      </h1>
      <p className="text-[24px] sm:text-[20px] mt-4 font-medium">Sahifa topilmadi</p>
      <p className="text-gray-600 mt-2 text-center max-w-[400px]">
        Ehtimol, siz mavjud bo‘lmagan havolaga kirgansiz yoki sahifa o‘chirib yuborilgan.
      </p>
      <Link to="/">
        <Button
          type="primary"
          className="!mt-8 !px-8 !py-5 !text-[18px] !rounded-xl !transition-all !duration-300 hover:opacity-[90%] hover:duration-300 hover:scale-[1.05]"
        >
          Bosh sahifaga
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
