<template>
  <div>
    <form-wizard
      color="#BB9F56"
      :title="null"
      :subtitle="null"
      layout="vertical"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="wizard-vertical mb-3"
      @on-complete="formSubmitted"
    >
      <!-- account datails tab -->
      <tab-content title="Product">
        <validation-observer ref="simpleRules">
          <b-form>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label for="Product name-default">Product name</label>
                  <validation-provider
                    id="Product name-default"
                    #default="{ errors }"
                    name="Product name"
                    rules="required"
                  >
                    <b-form-input
                      v-model="name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Product name"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="Optional-default">Custom URL (Slug) - Optional</label>
                  <validation-provider
                    id="Optional-default"
                    #default="{ errors }"
                    name="Custom URL (Slug) - Optional"
                    rules="required|email"
                  >
                    <b-form-input
                      v-model="emailValue"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Custom URL (Slug) - Optional"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="SKU-default">SKU</label>
                  <validation-provider
                    id="SKU-default"
                    #default="{ errors }"
                    name="SKU"
                  >
                    <b-form-input
                      v-model="PricedValue"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Price"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="Price-default">Price</label>
                  <validation-provider
                    id="Price-default"
                    #default="{ errors }"
                    name="Price"
                    rules="required"
                  >
                    <b-form-input
                      v-model="name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Product name"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="Quantity-default">Quantity</label>
                  <validation-provider
                    id="Quantity-default"
                    #default="{ errors }"
                    name="Quantity"
                  >
                    <b-form-input
                      v-model="passwordCon"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Quantity"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="select-default">Brand</label>
                  <b-form-select
                    id="select-default"
                    v-model="selected"
                    :options="options"
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <label for="textarea-default">Descriptions</label>
                <b-form-textarea
                  id="textarea-default"
                  placeholder="Textarea"
                  rows="2"
                  size="4"
                />
              </b-col>

              <!-- submit button -->
              <!-- <b-col md="12">
                                <b-button class="w-100 mt-3" variant="primary" type="submit"
                                    @click.prevent="validationForm">
                                    Submit
                                </b-button>
                            </b-col> -->
            </b-row>

          </b-form>

        </validation-observer>
      </tab-content>

      <!-- personal info tab -->
      <tab-content title="Gallary images">
        <b-row>
          <b-form-group
            label="Select image:"
            label-for="file-large"
            label-cols-sm="2"
            label-size="lg"
          >
            <b-form-file
              id="file-large"
              size="lg"
            />
          </b-form-group>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content title="Size $ Color Attributes">
        <b-row>
          <b-col md="6">
            <b-form-group
              label="Color:"
              label-for="Color"
              label-size="lg"
            >
              <b-form-select
                v-model="selectedColor"
                :options="optionsColor"
                size="lg"
              />

            </b-form-group>

          </b-col>
          <b-col md="6">
            <b-form-group
              label="Size:"
              label-for="Size"
              label-size="lg"
            >
              <b-form-select
                v-model="selectedSize"
                :options="optionsSize"
                size="lg"
              />
            </b-form-group>
          </b-col>

        </b-row>
        <b-row>
          <b-col
            md="6"
            xl="4"
            class="mb-1"
          >

            <!-- basic -->
            <b-form-group
              label="Quantity"
              label-for="Quantity"
            >
              <b-form-input
                id="Quantity"
                placeholder="Quantity"
              />
            </b-form-group>
          </b-col>

          <b-col
            md="6"
            xl="4"
            class="mb-1"
          >
            <!-- input text with help -->
            <b-form-group>
              <label for="InputPrice">Price</label>
              <b-form-input id="InputPrice" />
            </b-form-group>
          </b-col>
          <b-table-lite
            hover
            :items="items"
          >
            <template v-slot:cell(DELETE)="data">
              <b-button
                variant="gradient-danger"
                class="btn-icon"
                @click="delete (data.items)"
              >
                <feather-icon icon="TrashIcon" />
              </b-button>
            </template>
          </b-table-lite>

          <b-col sm="12">
            <label for="tags-basic">Type a new tag and press enter</label>
            <b-form-tags
              v-model="value"
              input-id="tags-basic"
              class="mb-2 m-1"
            />
            <b-form-checkbox
              class="m-1"
              checked="true"
              name="check-button"
              switch
              inline
            >
              Publish
            </b-form-checkbox>
          </b-col>
          <b-col sm="12">

            <b-form-file
              id="file-large"
              class="m-1"
              size="lg"
            />

          </b-col>
        </b-row>
      </tab-content>

    </form-wizard>

  </div>
</template>

<script>
import {
  BButton,
  BCol,
  BForm,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTags,
  BFormTextarea,
  BRow,
  BTableLite,
} from 'bootstrap-vue'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    BFormTags,
    BFormCheckbox,
    BTableLite,
    BFormFile,
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormTextarea,
    BFormSelect,
    FormWizard,
    TabContent,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      value: ['apple', 'orange'],
      items: [
        {
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald',
          DELETE: 'DELETE',
        },
        {
          age: 21,
          first_name: 'Larsen',
          last_name: 'Shaw',
          DELETE: 'DELETE',
        },

      ],

      selectedColor: null,
      optionsColor: [
        {
          value: null,
          text: 'Please select an option',
        },
        {
          value: 'a',
          text: 'This is First option',
        },
        {
          value: 'b',
          text: 'Simple Option',
        },
        {
          value: { C: '3PO' },
          text: 'This is an option with object value',
        },
        {
          value: 'd',
          text: 'This one is disabled',
          disabled: true,
        },
      ],
      selectedSize: null,
      optionsSize: [
        {
          value: null,
          text: 'Please select an option',
        },
        {
          value: 'a',
          text: 'This is First option',
        },
        {
          value: 'b',
          text: 'Simple Option',
        },
        {
          value: { C: '3PO' },
          text: 'This is an option with object value',
        },
        {
          value: 'd',
          text: 'This one is disabled',
          disabled: true,
        },
      ],
      selectedContry: 'select_value',
      selectedLanguage: 'nothing_selected',
      countryName: [
        {
          value: 'select_value',
          text: 'Select Value',
        },
        {
          value: 'Russia',
          text: 'Russia',
        },
        {
          value: 'Canada',
          text: 'Canada',
        },
        {
          value: 'China',
          text: 'China',
        },
        {
          value: 'United States',
          text: 'United States',
        },
        {
          value: 'Brazil',
          text: 'Brazil',
        },
        {
          value: 'Australia',
          text: 'Australia',
        },
        {
          value: 'India',
          text: 'India',
        },
      ],
      languageName: [
        {
          value: 'nothing_selected',
          text: 'Nothing Selected',
        },
        {
          value: 'English',
          text: 'English',
        },
        {
          value: 'Chinese',
          text: 'Mandarin Chinese',
        },
        {
          value: 'Hindi',
          text: 'Hindi',
        },
        {
          value: 'Spanish',
          text: 'Spanish',
        },
        {
          value: 'Arabic',
          text: 'Arabic',
        },
        {
          value: 'Malay',
          text: 'Malay',
        },
        {
          value: 'Russian',
          text: 'Russian',
        },
      ],
    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>
