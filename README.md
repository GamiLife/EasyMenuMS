## Company

{
  company: {}
  brand: {}
  theme: {}
  logos: {}
  social_networks: {}
}

social networks entity 1-n
  id
  name
  description

brand_social_networks_entity
  id
  brand_id
  social_id
  social_logo
  user
  phone
  country code

logos_provider entity 1-n
  id 
  brand_id
  name(primary logo,secondary logo,footer image)
  description
  alt

theme_provider:
  id
  brand_id
  theme_mode('LIGHT' | 'DARK')
  name(primary,secondary,third)

brand entity:
  id
  meta_title
  meta_description
  