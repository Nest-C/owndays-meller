# OWNDAYS × MELLER API Documentation

Static JSON API providing product catalog and store location data for the OWNDAYS × MELLER collaboration.

**Base Path:** `/meller`

---

## Endpoints

| Endpoint | File | Description |
|---|---|---|
| `GET /meller/products.json` | `meller/products.json` | Retrieve all OWNDAYS × MELLER products |
| `GET /meller/stores.json` | `meller/stores.json` | Retrieve all stores carrying the MELLER collection |

---

## Products

### `GET /meller/products.json`

Returns the full product catalog for the OWNDAYS × MELLER sunglasses collection.

### Response

```json
{
  "success": true,
  "message": "Product data retrieved successfully.",
  "total": 8,
  "not_found": [],
  "data": [ ... ]
}
```

#### Top-Level Fields

| Field | Type | Description |
|---|---|---|
| `success` | `boolean` | Whether the request was successful |
| `message` | `string` | Human-readable status message |
| `total` | `integer` | Total number of products returned |
| `not_found` | `array` | List of requested product codes that were not found |
| `data` | `array<ProductItem>` | Array of product items |

#### `ProductItem` Object

Each item in the `data` array contains the following nested objects:

| Field | Type | Description |
|---|---|---|
| `product` | `Product` | Core product details |
| `product_line` | `ProductLine` | Brand/collection information |
| `product_type` | `ProductType` | Product category |
| `localization` | `Localization` | Localized name and description |
| `nose_pad_type` | `NosePadType` | Nose pad fit type |
| `frame_types` | `array<FrameType>` | Frame shape classifications |
| `materials` | `array<Material>` | Frame material(s) used |
| `tags` | `array<Tag>` | Product tags |
| `selling_setting` | `SellingSetting` | Pricing and availability per country |
| `skus` | `array<SKU>` | Stock-keeping units (color variants) |

#### `Product`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `2787` | Unique product ID |
| `code` | `string` | `"ML2001D-6S"` | Product code |
| `name` | `string\|null` | `null` | Product name (if set) |
| `model_name` | `string` | `"ADISA"` | Model name |
| `lens_width` | `string` | `"53"` | Lens width in mm |
| `lens_height` | `string` | `"36.0"` | Lens height in mm |
| `bridge_width` | `string` | `"21"` | Bridge width in mm |
| `temple_depth` | `string` | `"145"` | Temple arm length in mm |
| `frame_weight` | `string` | `"0.00"` | Frame weight in grams |
| `is_made_in_japan` | `boolean` | `false` | Whether the product is manufactured in Japan |
| `is_free` | `boolean` | `false` | Whether the product is free |
| `size_frame` | `string` | `"147.1"` | Total frame width in mm |
| `size_range` | `string` | `"XL"` | Size category (`S`, `M`, `L`, `XL`, etc.) |

#### `ProductLine`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `88` | Product line ID |
| `name` | `string` | `"OWNDAYS × MELLER"` | Product line display name |
| `slug` | `string` | `"meller"` | URL-safe identifier |

#### `ProductType`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `2` | Product type ID |
| `name` | `string` | `"Sunglasses"` | Product type name |

#### `Localization`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `63826` | Localization record ID |
| `language_code` | `string` | `"ja"` | ISO language code |
| `name` | `string\|null` | `null` | Localized product name |
| `description` | `string` | `"クラシックな..."` | Localized product description |

#### `NosePadType`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `1` | Nose pad type ID |
| `name` | `string` | `"Asian fit"` | Nose pad type name |

#### `FrameType`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `1` | Frame type ID |
| `code` | `string` | `"square"` | Frame shape code |

#### `Material`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `1` | Material ID |
| `name` | `string\|null` | `null` | Material name |

#### `SellingSetting`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `21964` | Selling setting ID |
| `country_code` | `string` | `"jp"` | ISO country code |
| `price` | `integer` | `7800` | Retail price (tax included) |
| `raw_price` | `integer` | `7091` | Price before tax |
| `code` | `string\|null` | `null` | Optional selling code |
| `is_published` | `boolean` | `true` | Whether the product is publicly listed |
| `status` | `integer` | `0` | Selling status code |
| `in_stock` | `integer` | `2` | Stock level indicator |

#### `SKU`

Each SKU represents a color variant of the product.

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `9445` | SKU ID |
| `code` | `string` | `"C1"` | Color variant code |
| `jan_code` | `string` | `"2300002260418"` | JAN/barcode |
| `try_on_code` | `string` | `"s=40&g=22036"` | Virtual try-on parameter string |
| `order` | `integer` | `1` | Display sort order |
| `size` | `string\|null` | `null` | Size label (if applicable) |
| `is_default_display` | `integer` | `0` | Whether this is the default display variant |
| `is_online_exclusive` | `boolean` | `false` | Whether this variant is online-only |
| `colors` | `array<Color>` | | Color information for this variant |
| `images` | `array<Image>` | | Product images for this variant |
| `sizes` | `array` | `[]` | Additional size options |

#### `Color`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `38` | Color ID |
| `code` | `string` | `"black"` | Machine-readable color code |
| `name` | `string` | `"ブラック"` | Default display name |
| `path` | `string\|null` | `null` | Path to color swatch image |
| `hex_code` | `string\|null` | `"#000000"` | Hex color code (when no swatch image) |
| `localizations` | `array<ColorLocalization>` | | Localized color names |

#### `ColorLocalization`

| Field | Type | Example | Description |
|---|---|---|---|
| `language_code` | `string` | `"en"` | ISO language code (`ja`, `en`, `zh_cn`, `zh_tw`, `th`, `vi`) |
| `name` | `string` | `"Black"` | Localized color name |

#### `Image` (Product)

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `126032` | Image ID |
| `path` | `string` | `"products/36ebdac7-...webp"` | Relative image path |
| `path_webp` | `string\|null` | `null` | Alternative WebP path |
| `order` | `integer` | `1` | Display sort order |

---

## Stores

### `GET /meller/stores.json`

Returns all physical store locations that carry the OWNDAYS × MELLER collection.

### Response

```json
{
  "success": true,
  "message": "Stores retrieved successfully.",
  "total": 36,
  "not_found": [],
  "data": [ ... ]
}
```

#### Top-Level Fields

| Field | Type | Description |
|---|---|---|
| `success` | `boolean` | Whether the request was successful |
| `message` | `string` | Human-readable status message |
| `total` | `integer` | Total number of stores returned |
| `not_found` | `array` | List of requested store codes that were not found |
| `data` | `array<StoreItem>` | Array of store items |

#### `StoreItem` Object

Each item in the `data` array contains the following nested objects:

| Field | Type | Description |
|---|---|---|
| `store` | `Store` | Core store information |
| `localization` | `StoreLocalization` | Localized store details |
| `tags` | `array<Tag>` | Store feature tags |
| `images` | `array<StoreImage>` | Store photos |
| `business_hours` | `array<BusinessHour>` | Weekly operating hours |
| `short_times` | `array` | Temporary schedule changes |
| `region` | `Region` | Geographic region |
| `area` | `Area` | Prefecture/area |

#### `Store`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `693` | Unique store ID |
| `code` | `string` | `"2119"` | Internal store code |
| `name` | `string` | `"なんばCITY"` | Store name |
| `country_code` | `string` | `"jp"` | ISO country code |
| `is_published` | `boolean` | `true` | Whether the store is publicly visible |
| `status` | `string` | `"normal"` | Store operating status |
| `phone` | `string` | `"06-4394-8737"` | Store phone number |
| `mobile_phone` | `string` | `"090-6002-1309"` | Store mobile phone |
| `zip` | `string` | `"542-0076"` | Postal/zip code |
| `latitude` | `float` | `34.662565502652` | GPS latitude |
| `longitude` | `float` | `135.50249132499` | GPS longitude |
| `google_maps_url` | `string` | `"vD8mcxRyfXYPTx7J6"` | Google Maps Place ID / short link key |
| `open_at` | `string` | `"11:00:00"` | Default opening time (`HH:MM:SS`) |
| `close_at` | `string` | `"21:00:00"` | Default closing time (`HH:MM:SS`) |
| `start_date` | `string` | `"2022-03-10"` | Store opening date (`YYYY-MM-DD`) |
| `end_date` | `string\|null` | `null` | Store closing date (null = still open) |

#### `StoreLocalization`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `37217` | Localization record ID |
| `language_code` | `string` | `"ja"` | ISO language code |
| `name` | `string` | `"なんばCITY店"` | Localized store name |
| `address` | `string` | `"〒542-0076 大阪府..."` | Full localized address |
| `building_name` | `string` | `"なんばCITY 南館 1F"` | Building/floor details |
| `holidays` | `string` | `"施設定休日に準ずる"` | Holiday schedule description |
| `brief` | `string\|null` | `null` | Short store description |
| `details` | `string\|null` | `null` | Detailed store information |

#### `Tag`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `11` | Tag ID |
| `name` | `string` | `"Remote Eye Check"` | Tag display name |
| `icon` | `string\|null` | `null` | Tag icon path |

#### `StoreImage`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `3803` | Image ID |
| `path` | `string` | `"stores/00f8f379-...jpeg"` | Relative image path |
| `order` | `integer` | `1` | Display sort order |

#### `BusinessHour`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `3460` | Business hour record ID |
| `day` | `string` | `"sun"` | Day of week (`sun`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`) |
| `open_at` | `string` | `"11:00:00"` | Opening time (`HH:MM:SS`) |
| `close_at` | `string` | `"21:00:00"` | Closing time (`HH:MM:SS`) |
| `is_holiday` | `integer` | `0` | Whether the store is closed on this day (`0` = open, `1` = closed) |

#### `Region`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `6` | Region ID |
| `code` | `string` | `"kinki"` | Region code |
| `name` | `string` | `"近畿"` | Region name |

#### `Area`

| Field | Type | Example | Description |
|---|---|---|---|
| `id` | `integer` | `28` | Area ID |
| `code` | `string` | `"osaka"` | Area/prefecture code |
| `name` | `string` | `"大阪府"` | Area/prefecture name |

---

## Data Notes

- **Prices** are in the local currency of the `country_code` (JPY for `jp`). The `price` field includes tax; `raw_price` is the pre-tax amount.
- **Images** use relative paths. Prepend your asset base URL to construct full URLs.
- **Localization** data is primarily in Japanese (`ja`). Color names may include additional localizations (`en`, `zh_cn`, `zh_tw`, `th`, `vi`).
- **Nullable fields** are marked as `type|null` — check for `null` before using these values.
- **Time format** uses `HH:MM:SS` (24-hour).
- **Date format** uses `YYYY-MM-DD`.
