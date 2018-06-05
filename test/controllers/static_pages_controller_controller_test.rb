require 'test_helper'

class StaticPagesControllerControllerTest < ActionDispatch::IntegrationTest
  test "should get root" do
    get static_pages_controller_root_url
    assert_response :success
  end

end
