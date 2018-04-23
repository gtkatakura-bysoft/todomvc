json.extract! event, :id, :type_name, :data, :created_at, :updated_at
json.url event_url(event, format: :json)