export interface ProductProfileInterface {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: string | null;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to: string | null;
    date_on_sale_to_gmt: string | null;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    low_stock_amount: number | null;
    sold_individually: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    tags: any[];
    images: {
        id: number;
        date_created: string;
        date_created_gmt: string;
        date_modified: string;
        date_modified_gmt: string;
        src: string;
        name: string;
        alt: string;
    }[];
    attributes: {
        id: number;
        name: string;
        slug: string;
        position: number;
        visible: boolean;
        variation: boolean;
        options: string[];
    }[];
    default_attributes: any[];
    variations: number[];
    grouped_products: any[];
    menu_order: number;
    price_html: string;
    related_ids: number[];
    meta_data: {
        id: number;
        key: string;
        value: any;
    }[];
    stock_status: string;
    has_options: boolean;
    post_password: string;
    featured_image_urls: {
        full: string;
        thumbnail: string;
        medium: string;
        medium_large: string;
        large: string;
        '1536x1536': string;
        '2048x2048': string;
        woocommerce_archive_thumbnail: string;
        woocommerce_thumbnail: string;
        woocommerce_single: string;
        woocommerce_gallery_thumbnail: string;
    };
    post_excerpt_stackable: string;
    category_list: string;
    author_info: {
        name: string;
        url: string;
    };
    comments_num: string;
    yoast_head: string;
    yoast_head_json: any; // You may define a more specific type for this if needed
    jetpack_sharing_enabled: boolean;
    google_listings_and_ads__channel_visibility: {
        is_visible: boolean;
        channel_visibility: string;
        sync_status: string;
        issues: any[];
    };
    baselinker_variations: {
        id: number;
        sku: string;
        in_stock: boolean;
        stock_quantity: string;
        price: number;
        regular_price: number;
        sale_price: number;
        description: string;
        visible: boolean;
        manage_stock: boolean;
        purchasable: boolean;
        on_sale: boolean;
        image: {
            id: number;
            src: string;
        };
        attributes: {
            id: string;
            name: string;
            option: string;
        }[];
        weight: string;
        meta_data: {
            key: string;
            value: any;
        }[];
    }[];
    baselinker_prod_version: string;
    ean: string;
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
    };
}



export interface SimpleProductInterface {
    id: number;
    tracking_number: string;
    order_id: string;
    state_description: string;
}

// export interface GetOneProductResponse {
//     product: ProductProfileInterface,
// }

export type GetOneProductResponse = ProductProfileInterface

export type GetListOfAllProductsResponse = GetOneProductResponse[]
