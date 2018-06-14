json.difficulties do
  @difficulties.each  do |dif|
    json.set! dif[:id] do
      json.extract! dif, :id, :level
    end
  end
end

json.cuisines do
  @cuisines.each  do |cus|
    json.set! cus[:id] do
      json.extract! cus, :id, :sort, :country
    end
  end

end

json.categories do
  @categories.each  do |cat|
    json.set! cat[:id] do
      json.extract! cat, :id, :name
    end
  end
end

json.diets do
  @diets.each  do |diet|
    json.set! diet[:id] do
      json.extract! diet, :id, :name
    end
  end
end

json.measurings do
  @measurings.each  do |measuring|
    json.set! measuring[:id] do
      json.extract! measuring, :id, :name
    end
  end
end

json.ingredients do
  @ingredients.each  do |ing|
    json.set! ing[:id] do
      json.extract! ing, :name
    end
  end
end
