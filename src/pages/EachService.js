import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './EachService.css';

const EachService = (props) => {
  const { aboutProps } = props.location;
  return (
    <>
      <Navbar />
      <div className="eachService">
        <h1>{aboutProps.title}</h1>
        <div className="container">
          <p className="eachService__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odio
            vel aliquid explicabo ut recusandae enim earum. Modi corrupti
            expedita tenetur, ad illo et voluptatum ducimus natus distinctio
            reiciendis? Delectus deleniti amet consectetur dignissimos animi
            commodi repellat esse voluptatibus quam, vel nobis tenetur autem
            voluptates dolores quod cum repellendus facilis inventore quis
            ipsum? Perspiciatis id sit cum quaerat, laboriosam dolorem explicabo
            deserunt modi corporis suscipit. Veritatis sequi ab inventore harum
            repudiandae error atque fugiat obcaecati ex? Iusto animi accusamus
            vero sunt expedita unde eius reprehenderit at voluptatem ullam
            sapiente sequi similique, esse, tempore voluptatum voluptates ea ad
            eos. Beatae ratione earum harum vel at, facilis animi voluptates eos
            incidunt placeat repellat nemo officia enim magni velit. Ullam
            ducimus, aperiam, fugit deserunt debitis, magni voluptatem cumque
            quidem saepe et quam est obcaecati maiores tempora necessitatibus
            aliquid! Modi magnam, atque dignissimos soluta minus, perspiciatis
            error ut dolores accusantium odio illum ducimus adipisci nam quae
            quam? Sed cupiditate vitae libero quam distinctio. Repudiandae
            quisquam maiores impedit temporibus fugiat voluptatem dolores
            architecto quibusdam nemo libero, repellendus vitae quaerat dolorem
            tempora hic itaque a quae qui porro enim ut amet totam delectus!
            Ipsam voluptatum, corrupti voluptatibus amet provident commodi
            nostrum facere consequatur, eos cum nesciunt?
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EachService;
