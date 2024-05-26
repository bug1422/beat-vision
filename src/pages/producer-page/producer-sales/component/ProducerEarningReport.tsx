import ComponentContainerCard from "@/my-component/ComponentContainerCard";
import { Link } from "react-router-dom";
import defautAudioImage from "../../../../../public/default-image/defaultSoundwave.jpg";

export type ProducerOrderDetailType = {
  OrderId: number;
  TrackId: number;
  BuyderId: number;
  TrackImageUrl: string;
  Date: string;
  Price: string;
};
const ProductOrderDetails: ProducerOrderDetailType[] = [
  {
    OrderId: 1,
    TrackId: 1,
    BuyderId: 1,
    Date: "this will show date",
    TrackImageUrl: defautAudioImage,
    Price: "200000",
  },
  {
    OrderId: 2,
    TrackId: 2,
    BuyderId: 2,
    Date: "this will show date",
    Price: "200000",
    TrackImageUrl: defautAudioImage,
  },
  {
    OrderId: 3,
    TrackId: 3,
    BuyderId: 3,
    Date: "this will show date",
    Price: "200000",
    TrackImageUrl: defautAudioImage,
  },
];
const PopulerProducts = () => {
  return (
    <ComponentContainerCard title="Most Populer Products">
      <div className="table-responsive">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th className="border-top-0">Order</th>
              <th className="border-top-0">Date</th>
              <th className="border-top-0">Price</th>
              <th className="border-top-0">Detail</th>
            </tr>
          </thead>
          <tbody>
            {ProductOrderDetails.map((products, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <div className="media">
                      <img
                        src={products.TrackImageUrl}
                        height="50"
                        className="me-3 align-self-center rounded"
                        alt="..."
                      />
                      <div className="media-body align-self-center">
                        <h6 className="m-0">
                          BuyderId:{products.BuyderId} , TrackId: {products.TrackId}
                        </h6>
                        <a
                          href="#"
                          className="font-12 text-primary"
                          style={{ textDecoration: "none", fontSize: "0.9rem" }}
                        >
                          OrderId: {products.OrderId}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>{products.Date} </td>
                  <td>
                    {products.Price}
                    {"vnd "}
                  </td>
                  <td>
                    <Link to="#">
                      <i className="fas fa-bars text-secondary font-16"> detail</i>
                    </Link>
                    {/* <Link to="#">
                      <i className="las la-trash-alt text-secondary font-16"></i>
                    </Link> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>
  );
};

export const ProducerEarningReport = PopulerProducts;
