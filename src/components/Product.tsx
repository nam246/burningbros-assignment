import { Product as PRD } from '../type'


export default function Product({ product: product }: { product: PRD }) {

    return (
        <div className="product">
            <img src={product.images[0]} alt="product image" loading="lazy" width={200} />
            <div>
                <p>{product.id}</p>
                <p>{product.title}</p>
                <p>{product.price}</p>
            </div>
        </div>
    )
}