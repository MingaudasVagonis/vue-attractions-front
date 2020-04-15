# Atrractions' frontend in vue

Simple page used to help populate the database with attractions in Lithuania written in Vue. Used with [attractions' server](https://github.com/MingaudasVagonis/go-attractions-server).

 - [**Example**](#example)  
 - [**Components**](#components)  
 - [**Packages & usage**](#packages-and-usage)  
 
## Example

<img src="https://media.giphy.com/media/VbEkOOjOic1vKRDqgf/giphy.gif" width="80%"/>

**Fully responsive**

<img src="https://media.giphy.com/media/WSs7tPk3cCWfrt7UCH/giphy.gif" width="15%"/>
 
## Components

 ### *MLField*  [***ml_field.vue***](src/components/ml_field.vue)

 **A wrapper around html's input**
 
 <img src="https://media.giphy.com/media/KeL9wVKlyzGqc72GEc/giphy.gif" width="50%"/>

#### Props

Name|Type|Required|Description
--- | --- | --- | ---
**size**|String|No|Size of the field. Either "small" or "medium".
**type**|String|No|Either "number" or "text".
**placeholder**|String|Yes| Input placeholder.
**validate**|Function|Yes| Function that is called on input blur to determine whether its valid.

#### Data

Name|Type|Description
--- | --- | ---
**focused**|Bool| Whether the input is focused.
**border**|String|Border color.
**value**|String| Input's v-model.
**validated**|Number| State of content's validation. 0 - empty, 1 - invalid, 2 - valid.

### *RowSelector*  [***row_selector.vue***](src/components/row_selector.vue)

 **N stages toggle**
 
 <img src="https://media.giphy.com/media/WqcrRE7QBCD7Ku6fUS/giphy.gif" width="50%"/>

#### Props

Name|Type|Required|Description
--- | --- | --- | ---
**values**|Array|Yes|Array of values to select from.

#### Data

Name|Type|Description
--- | --- | ---
**selected**|Number| Currently selected item.

### *HourPicker*  [***hour_picker.vue***](src/components/hour_picker.vue)

 **N stages toggle**
 
 <img src="https://media.giphy.com/media/TiPWE1WV93ChZh1RjV/giphy.gif" width="50%"/>

#### Props

Name|Type|Required|Description
--- | --- | --- | ---
**model**|Array|Yes|Array of 2 strings used as v-models to two time pickers .

### *ImageField*  [***image_field.vue***](src/components/image_field.vue)

 **Component used to display an image from the url provided**
 
 <img src="https://media.giphy.com/media/dydELPWfpdXpERDicP/giphy.gif" width="40%"/>

#### Data

Name|Type|Description
--- | --- | ---
**url**|String| Url of the image.
**copyright**|String| Copyright information.
**copyright_exists**|Bool| Whether the image is copyrighted at all.
**validateURL**|Function| Validation function passed to the url field.
**validateCopyright**|Function| Validation function passed to the copyright field.

## Packages and usage

### Following packages are used ( excluding Vue )
 - [axios](https://github.com/axios/axios)
 - [vue-page-transition](https://github.com/Orlandster/vue-page-transition)
 - [vue-router](https://router.vuejs.org)
 - [vue-spinner](https://github.com/greyby/vue-spinner)
 - [vue2-timepicker](https://phoenixwong.github.io/vue2-timepicker/)
 
### Launch: 
```
  git clone https://github.com/MingaudasVagonis/vue-attractions-front.git
  cd vue-attractions-front
  yarn install && yarn serve
```
### Build: 
```
  yarn build
```
