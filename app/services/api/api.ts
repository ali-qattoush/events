/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApisauceInstance, ApiResponse, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import { getGeneralApiProblem } from "./apiProblem"
import uuid from "react-native-uuid"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

// Define the structure of the raw API response
export interface ApiResponseData {
  count: number
  page: number
  page_size: number
  results: Event[]
}

export interface Event {
  created_at: string
  description: string
  end_date: string | null
  constraints: string[]
  lat: number
  source_url: string
  categories: string[]
  long: number
  provider: string
  updated_at: string
  activity_url: string
  seasonal: number
  city: string
  cost_range: string | null
  standardized_category: string
  activity_id: number
  availability: {
    dates: string[]
    access: string[]
  }
  title: string
  deleted_at: string | null
  request_id: number
  cost: {
    price: number
  }
  standardized_constraints: {
    accessibility: {
      accessible: boolean
      notes: string[]
    }
    age: {
      constraints: boolean
      minimum_age: number
      notes: string[]
    }
    other_notes: string[]
  }
  location: string
  start_date: string | null
  raw_location: {
    venue: string
    address: string
  }
  rating: number
  reviews: number
  top_rated: boolean
  limited_time: boolean
  family_kids_friendly: boolean
  include_food: boolean
  accessibility: boolean
  special_price: boolean
  free_cancellation: boolean
  event_time: string | null
  activity_type: string
  image_links: string[]
  random_image: boolean
}

// Define the structure of the mapped event object
export interface MappedEvent {
  id: string
  title: string
  description: string
  city: string
  activity_type: string
  rating: number
  reviews: number
  top_rated: boolean
  family: boolean
  limited: boolean
  include_food: boolean
  accessibility: boolean
  special_price: boolean
  free_cancellation: boolean
  cost: number
  image: string
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getData(): Promise<MappedEvent[] | { kind: string }> {
    const response: ApiResponse<ApiResponseData> = await this.apisauce.get<ApiResponseData>(
      `/activities`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    if (!response.data || !response.data.results) {
      return { kind: "bad-data" }
    }

    try {
      const cleanData = response.data.results.map((event: Event) => {
        return {
          id: uuid.v4() as string,
          title: event.title,
          description: event.description,
          city: event.city,
          activity_type: event.activity_type,
          rating: event.rating,
          reviews: event.reviews,
          top_rated: event.top_rated,
          family: event.family_kids_friendly,
          limited: event.limited_time,
          include_food: event.include_food,
          accessibility: event.accessibility,
          special_price: event.special_price,
          free_cancellation: event.free_cancellation,
          cost: event.cost.price,
          image: event.image_links[0],
        }
      })

      return cleanData
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
